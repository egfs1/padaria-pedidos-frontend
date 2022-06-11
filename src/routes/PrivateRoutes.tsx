import { Route, Routes } from "react-router-dom";
import { CompaniesRouter } from "./CompaniesRouter";
import { CustomRoute } from "./CustomRoute";
import { OrdersRouter } from "./OrdersRouter";
import { PricesRouter } from "./PricesRouter";
import { ProductsRouter } from "./ProductsRouter";

export function PrivateRoutes(){
    return (
        <>
            <Routes>
                <Route path="/*" element={
                    <CustomRoute isRoutePrivate>
                        <OrdersRouter />
                    </CustomRoute>
                } />
                <Route path="/orders/*" element={
                    <CustomRoute isRoutePrivate>
                        <OrdersRouter />
                    </CustomRoute>
                } />
                <Route path="/products/*" element={
                    <CustomRoute isRouteAdmin isRoutePrivate>
                        <ProductsRouter />
                    </CustomRoute>
                } />
                <Route path="/companies/*" element={
                    <CustomRoute isRouteAdmin isRoutePrivate>
                        <CompaniesRouter />
                    </CustomRoute>
                } />
                <Route path="/prices/*" element={
                    <CustomRoute isRouteAdmin isRoutePrivate>
                        <PricesRouter />
                    </CustomRoute>
                } />
            </Routes>
        </>
    )
}