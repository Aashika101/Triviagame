// import jwt from  'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//     const token = req.cookies.token
//     if (!token) return res.status(401).json({success: false, message: "Unauthorized - notoken provided"})
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET)

//       if(!decoded) return res.status(401).json({success: false, message: "Unauthorized - invalid token"})
//       req.userId = decoded.userId
//       next()

//     } catch (error) {
//         console.log("Error in verifyToken ", error);
//         return res.status(500).json({success: false, message: "Server error"});

//     }
// }

import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    // Check for the token in the Authorization header
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized - no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });
        }

        req.userId = decoded.userId; // Attach user ID to request
        console.log("User ID:", req.userId); // Check if userId is correctly set
        next();
    } catch (error) {
        console.log("Error in verifyToken", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};