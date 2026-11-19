import {
  AntigravitySettings,
  ClaudeSettings,
  CodexSettings,
  isProviderDriverKind,
  ProviderDriverKind,
} from "@t3tools/contracts";
import { acpRegistryClient } from "@t3tools/provider-acp-registry/client";
import { makeProviderClientRegistry, type ProviderIcon } from "@t3tools/provider-core/client";
import { modelShortName } from "@t3tools/provider-core/modelShortName";
import { cursorClient } from "@t3tools/provider-cursor/client";
import { fxClient } from "@t3tools/provider-fx/client";
import { grokClient } from "@t3tools/provider-grok/client";
import { kiroClient } from "@t3tools/provider-kiro/client";
import { museClient } from "@t3tools/provider-muse/client";
import { openCodeClient } from "@t3tools/provider-opencode/client";
import { piClient } from "@t3tools/provider-pi/client";

// OpenRouter's Ink and Cloud glyphs from https://openrouter.ai/brand.
export const openRouterIcon: ProviderIcon = {
  viewBox: "0 0 1024 730",
  fill: { light: "#03080A", dark: "#FCFCFE" },
  paths: [
    {
      d: "M795.893 0C915.776 0 1012.95 97.9963 1012.95 218.88C1012.95 339.764 915.776 437.76 795.893 437.76L1011.2 654.869C1038.55 682.447 1019.18 729.6 980.504 729.6H361.77C161.97 729.6 0 566.273 0 364.8C0 163.327 161.97 0 361.77 0L795.893 0ZM361.77 145.92C241.89 145.92 144.708 243.916 144.708 364.8C144.708 485.684 241.89 583.68 361.77 583.68C481.649 583.68 578.831 485.684 578.831 364.8C578.831 243.916 481.649 145.92 361.77 145.92Z",
    },
  ],
};

// Inworld's mark from https://inworld.ai.
export const inworldIcon: ProviderIcon = {
  viewBox: "0 0 14 18",
  fill: { light: "#03080A", dark: "#FCFCFE" },
  paths: [
    {
      d: "M4.321 2.988c-.029.006-.03-.021-.013-.03.57-.326 1.381-.404 1.442-.448.054-.075-.371-.07-.52-.07a4.2 4.2 0 0 0-2.777 1.138C1.268 4.564.88 6.187 1.043 7.645a5.597 5.597 0 0 0 2.301 3.817c2.627 1.724 6.335.9 8.3-1.446 2.42-2.864 1.697-6.942-.832-8.806A6.956 6.956 0 0 0 8.664.213C8.303.108 7.8.007 7.569 0c-.354-.011-.236.273-.299.343-.062.07-.71.098.023.35.434.148.17.157-.161.45-.293.258-.037.548-.139.65-.434.437.231.629.574.82 1.664.867 2.58 2.427 2.277 4.264-.426 2.428-4.128 3.476-5.766 1.557-1.26-1.456-.784-3.878 1.01-4.668.249-.118.81-.289.569-.269-.929.076-1.654.558-1.888.733-.02.015-.047-.008-.035-.03.17-.291 1.155-.972 3.091-1.211.346-.073-.956-.34-2.504-.001Z",
    },
    {
      d: "M5.116 17.583c.105 0 .21.014.308.024.253.008.537-.02.815.015.604.033 1.212.165 1.817.18.418.03.816.011 1.242.027.322.04.704.016.992.058.18.02.345.011.525.037.478.067.954.077 1.438.07.184.006.372.01.556-.002.196-.011.41-.003.567-.126.093-.053.089-.163.108-.238.024-.04.075-.063.098-.104a.713.713 0 0 0 .042-.22V17.3c.005-.25-.117-.496-.21-.727a8.62 8.62 0 0 0-.537-.965c-.22-.304-.332-.72-.707-.884-.676-.29-1.372-.26-2.12-.348a59.988 59.988 0 0 0-4.217-.228c-1.222.017-3.381.095-4.493.191-1.974.172-1.055.478-1.117 1.019-.023.2-.246.183-.221.378.041.283.585.638.859.71 1.204.314-.394.36-.215.675.148.262.811.187 1.082.29l3.387.172Z",
    },
  ],
};

export const providerClients = makeProviderClientRegistry([
  {
    driverKind: ProviderDriverKind.make("codex"),
    label: "Codex",
    modelFamilies: ["GPT-", "GPT "],
    acpRegistryAgentIds: ["codex-acp"],
    settingsSchema: CodexSettings,
  },
  {
    driverKind: ProviderDriverKind.make("claudeAgent"),
    label: "Claude",
    modelFamilies: ["Claude "],
    acpRegistryAgentIds: ["claude-acp"],
    settingsSchema: ClaudeSettings,
  },
  cursorClient,
  grokClient,
  fxClient,
  openCodeClient,
  {
    driverKind: ProviderDriverKind.make("antigravity"),
    label: "Antigravity",
    modelFamilies: ["Gemini "],
    acpRegistryAgentIds: ["antigravity-acp"],
    settingsSchema: AntigravitySettings,
  },
  kiroClient,
  museClient,
  piClient,
  acpRegistryClient,
]);

export function getProviderClient(driver: string | null | undefined) {
  return isProviderDriverKind(driver) ? providerClients.get(driver) : undefined;
}

export function resolveModelShortName(
  model: { readonly name: string; readonly shortName?: string | undefined },
  driverKind: ProviderDriverKind | null | undefined,
): string | undefined {
  if (model.shortName) return model.shortName;
  const families = driverKind ? providerClients.get(driverKind)?.modelFamilies : undefined;
  return modelShortName(model.name, families ?? []);
}
