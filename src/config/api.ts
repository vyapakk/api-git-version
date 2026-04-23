/**
 * Global API Configuration
 */

// The base URL for the Yii2 backend
// Note: In Yii2 Basic, the entry point is usually /web/index.php
// With prettyUrls enabled, we can use /web/ as the base
// export const API_BASE_URL = 'http://localhost/new_stratview-yii2/web';
export const API_BASE_URL = 'https://dev.stratviewresearch.com/admin/web';

export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/react/login`,
        LOGOUT: `${API_BASE_URL}/react/logout`,
        ME: `${API_BASE_URL}/react/me`,
        UPDATE_PROFILE: `${API_BASE_URL}/react/update-profile`,
        VERIFY_EMAIL: `${API_BASE_URL}/react/verify-email`,
        FORGOT_PASSWORD: `${API_BASE_URL}/react/forgot-password`,
        RESET_PASSWORD: `${API_BASE_URL}/react/reset-password`,
    },
    DASHBOARD: {
        CATEGORIES: `${API_BASE_URL}/react/category-list`,
        SUBCATEGORIES: `${API_BASE_URL}/react/subcategory-list`,
        DATA: `${API_BASE_URL}/react/dashboard-data`,
        INQUIRY: `${API_BASE_URL}/react/submit-inquiry`,
        ANALYST_ENQUIRY: `${API_BASE_URL}/react/analyst-enquiry`,
        SUBSCRIPTIONS: `${API_BASE_URL}/react/user-subscriptions`,
        SEARCH: `${API_BASE_URL}/react/search`,
        NOTIFICATIONS: `${API_BASE_URL}/react/notifications`,
        // Per-user notification state (backend must persist these in a user_notification_state table)
        // POST { notification_id } – mark single notification as read for the authenticated user
        NOTIFICATION_MARK_READ: `${API_BASE_URL}/react/notifications/mark-read`,
        // POST – mark all notifications as read for the authenticated user
        NOTIFICATION_MARK_ALL_READ: `${API_BASE_URL}/react/notifications/mark-all-read`,
        // POST { notification_id } – soft-delete (dismiss) for the authenticated user only
        NOTIFICATION_DISMISS: `${API_BASE_URL}/react/notifications/dismiss`,
    }
};
