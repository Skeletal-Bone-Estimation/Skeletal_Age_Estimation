import { AbstractModel } from "../../models/CaseModel";

export abstract class AbstractBuilder { 
    public abstract make() : AbstractModel | null;
}