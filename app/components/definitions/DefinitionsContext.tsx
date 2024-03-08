import { Dictionary, Definition } from "@/app/types";
import { createContext, useState } from "react";

export const useDefinitionsState = () => useState<Dictionary<Definition>>({});

export const DefinitionsContext = createContext<ReturnType<typeof useDefinitionsState> | null>(null);
