import React from "react";
import { config } from "./config";

const TestDashboard = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold">{config.title}</h1>
            <p className="mt-4 text-muted-foreground">{config.subtitle}</p>
            <div className="mt-8 p-12 bg-primary/5 rounded-xl border border-dashed border-primary/20 flex items-center justify-center">
                <p className="text-primary font-medium">This is a manually added test dashboard page.</p>
            </div>
        </div>
    );
};

export default TestDashboard;
