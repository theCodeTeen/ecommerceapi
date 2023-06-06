class AppError extends Error {
    constructor(msg,code){
        super(msg);

        this.msg = msg;
        this.code = code;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;