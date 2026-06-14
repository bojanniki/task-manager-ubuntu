const errorHandler = (err, req,res,next) => {
    //log the error internally for the developer (with a timestamp)
    console.error(`[${new Date().toISOString()}] ❌ Global Error:`, err.stack || err.message);

    ///determine the status code (default to 500 Internal Server Error)
    const statusCode = err.statusCode || 500;

    //structure a clean safe JSON response fro the frontend

    const response = {
        error: true,
        message: err.message || "An unexpected server error occurred"
    };

    //only expose the stack trace if actively debugginf in development
    if(process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }
    res.status(statusCode).json(response);
};

module.exports = errorHandler;