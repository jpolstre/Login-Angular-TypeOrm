import UserController from "./controller/UserController";
import AuthController from "./controller/AuthController";
// import { ProductController } from "./controller/ProductController";
// import { CategoryController } from "./controller/CategoryController";


const userRoutes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "getAll"
}]



// const productsRoutes = [{
//     method: "get",
//     route: "/products",
//     controller: ProductController,
//     action: "all"
// }, {
//     method: "get",
//     route: "/products/:id",
//     controller: ProductController,
//     action: "one"
// }, {
//     method: "post",
//     route: "/products",
//     controller: ProductController,
//     action: "save"
// }, {
//     method: "delete",
//     route: "/products/:id",
//     controller: ProductController,
//     action: "remove"
// }]


// const categoriesRoutes = [{
//     method: "get",
//     route: "/categories",
//     controller: CategoryController,
//     action: "all"
// }, {
//     method: "get",
//     route: "/categories/:id",
//     controller: CategoryController,
//     action: "one"
// }, {
//     method: "post",
//     route: "/categories",
//     controller: CategoryController,
//     action: "save"
// }, {
//     method: "delete",
//     route: "/categories/:id",
//     controller: CategoryController,
//     action: "remove"
// }]


export default [
    // ...productsRoutes,
    ...userRoutes,
    // ...categoriesRoutes
];