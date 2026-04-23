import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ENDPOINTS } from '@/config/api';
import { apiService } from '@/lib/apiService';

export interface Notification {
    id: string;
    title: string;
    message: string;
    time: string;
    read: boolean;
    type: "update" | "alert" | "info";
}

export interface NotificationState {
    notifications: Notification[];
    isLoading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    isLoading: false,
    error: null,
};

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get(ENDPOINTS.DASHBOARD.NOTIFICATIONS);
            const data = await response.json();

            if (data.status === 'success') {
                return data.data as Notification[];
            } else {
                return rejectWithValue(data.message || 'Failed to fetch notifications');
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'Network error occurred');
        }
    }
);

/**
 * Persist a single notification's "read" state on the server for the current user.
 * Optimistically updates the UI via the `markAsRead` reducer; on failure, refetches
 * so the UI matches the server state again.
 *
 * Backend contract:
 *   POST /react/notifications/mark-read
 *   body: { notification_id: string }
 *   response: { status: 'success' } | { status: 'error', message: string }
 */
export const markNotificationRead = createAsyncThunk(
    'notifications/markRead',
    async (id: string, { dispatch, rejectWithValue }) => {
        // Optimistic local update
        dispatch(notificationSlice.actions.markAsRead(id));
        try {
            const response = await apiService.post(ENDPOINTS.DASHBOARD.NOTIFICATION_MARK_READ, {
                notification_id: id,
            });
            const data = await response.json();
            if (data.status !== 'success') {
                dispatch(fetchNotifications());
                return rejectWithValue(data.message || 'Failed to mark as read');
            }
            return id;
        } catch (error: any) {
            dispatch(fetchNotifications());
            return rejectWithValue(error.message || 'Network error occurred');
        }
    }
);

/**
 * Persist "mark all as read" on the server for the current user.
 *
 * Backend contract:
 *   POST /react/notifications/mark-all-read
 *   body: {}
 *   response: { status: 'success' } | { status: 'error', message: string }
 */
export const markAllNotificationsRead = createAsyncThunk(
    'notifications/markAllRead',
    async (_, { dispatch, rejectWithValue }) => {
        dispatch(notificationSlice.actions.markAllAsRead());
        try {
            const response = await apiService.post(ENDPOINTS.DASHBOARD.NOTIFICATION_MARK_ALL_READ, {});
            const data = await response.json();
            if (data.status !== 'success') {
                dispatch(fetchNotifications());
                return rejectWithValue(data.message || 'Failed to mark all as read');
            }
            return true;
        } catch (error: any) {
            dispatch(fetchNotifications());
            return rejectWithValue(error.message || 'Network error occurred');
        }
    }
);

/**
 * Soft-delete (dismiss) a notification for the current user only. The admin-pushed
 * notification row should NOT be removed globally — the backend should record a
 * per-user dismissal so subsequent GET /react/notifications calls exclude it.
 *
 * Backend contract:
 *   POST /react/notifications/dismiss
 *   body: { notification_id: string }
 *   response: { status: 'success' } | { status: 'error', message: string }
 */
export const dismissNotificationThunk = createAsyncThunk(
    'notifications/dismiss',
    async (id: string, { dispatch, rejectWithValue }) => {
        dispatch(notificationSlice.actions.dismissNotification(id));
        try {
            const response = await apiService.post(ENDPOINTS.DASHBOARD.NOTIFICATION_DISMISS, {
                notification_id: id,
            });
            const data = await response.json();
            if (data.status !== 'success') {
                dispatch(fetchNotifications());
                return rejectWithValue(data.message || 'Failed to dismiss notification');
            }
            return id;
        } catch (error: any) {
            dispatch(fetchNotifications());
            return rejectWithValue(error.message || 'Network error occurred');
        }
    }
);

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        markAsRead: (state, action) => {
            const notification = state.notifications.find(n => n.id === action.payload);
            if (notification) {
                notification.read = true;
            }
        },
        markAllAsRead: (state) => {
            state.notifications.forEach(n => {
                n.read = true;
            });
        },
        dismissNotification: (state, action) => {
            state.notifications = state.notifications.filter(n => n.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notifications = action.payload;
        });
        builder.addCase(fetchNotifications.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        });
    },
});

export const { markAsRead, markAllAsRead, dismissNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
