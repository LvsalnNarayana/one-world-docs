import { generateMockDocs } from "../generators/generateMockDoc";

/** In-memory doc library seed (hydrates localStorage on first load). */
export const mockDocLibrary = generateMockDocs(11);
