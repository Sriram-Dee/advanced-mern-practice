export const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.user) return res.sendStatus(401);
        const allowedRolesArray = [...allowedRoles];

        if(!allowedRolesArray.includes(req.user.role)){
            return res.status(403).json({ message: `Only ${allowedRolesArray.join(", ")} roles are allowed` });
        }
        console.log("Allowed roles: ", allowedRolesArray, "User role: ", req.user.role);
        next();
    }
}