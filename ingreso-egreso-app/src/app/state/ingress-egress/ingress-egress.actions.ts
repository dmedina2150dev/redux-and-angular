import { createAction, props } from "@ngrx/store";
import { IngressEgress } from "src/app/models/ingress-egress.model";

export const setItems = createAction(
    '[IngressEgress] setItems',
    props<{ items: IngressEgress[] }>()
);

export const unSetItems = createAction('[IngressEgress] unSetItems' );