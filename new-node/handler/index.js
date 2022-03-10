module.exports = {
    error: (error, message = "Something went wrong", ...params) => {
        return {
            success: false,
            errorMessage: error.toString() || message,
            message: message,
            data: null,
            options: params
        }
    },
    success: (data, messgae = "Request processed successfully", ...params) => {
        return {
            success: true,
            errorMessage: null,
            messgae: messgae,
            data: data,
            options: params
        }
    }
};