
import { Token } from "../interfaces/TokenInterface";
import { urbanTokens } from "./urbanTokens";
import { ruralTokens } from "./ruralTokens";
import { wholePropertyTokens } from "./wholePropertyTokens";

// Combine all fractional tokens into one array
export const mockTokens: Token[] = [
  ...urbanTokens,
  ...ruralTokens
];
