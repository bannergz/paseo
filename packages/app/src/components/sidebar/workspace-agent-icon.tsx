import { View } from "react-native";
import { StyleSheet, withUnistyles } from "react-native-unistyles";
import { useProviderIcon } from "@/components/provider-icons";
import type { Theme } from "@/styles/theme";

const AGENT_ICON_SIZE = 14;

const mutedMapping = (theme: Theme) => ({ color: theme.colors.foregroundMuted });

// The icon component depends on the provider, so the theme color goes in through a wrapper
// rather than a Themed* constant — same shape as terminal-profile-icon.tsx.
function ProviderIcon({
  provider,
  serverId,
  size,
  color = "",
}: {
  provider: string;
  serverId: string;
  size: number;
  color?: string;
}) {
  const Icon = useProviderIcon(provider, serverId);
  return <Icon size={size} color={color} />;
}

const ThemedProviderIcon = withUnistyles(ProviderIcon);

/**
 * The provider of the agent behind the row's status dot, as the same mark its tab carries.
 *
 * It sits on the title line, beside the trailing time, rather than on the meta line: a row with
 * no other meta item would otherwise grow a second line when the agent list arrives after the
 * workspace list. Here it only narrows the title, and the row keeps its height.
 *
 * Only the glyph: the provider name would repeat on every row of a single-provider sidebar. It
 * stays on the accessible label.
 */
export function WorkspaceAgentIcon({ provider, serverId }: { provider: string; serverId: string }) {
  return (
    <View
      style={styles.slot}
      accessibilityLabel={provider}
      testID={`sidebar-workspace-agent-${provider}`}
    >
      <ThemedProviderIcon
        provider={provider}
        serverId={serverId}
        size={AGENT_ICON_SIZE}
        uniProps={mutedMapping}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Centers the glyph on the title's line box so it reads level with the text, not its top.
  slot: {
    height: 20,
    justifyContent: "center",
    flexShrink: 0,
  },
});
