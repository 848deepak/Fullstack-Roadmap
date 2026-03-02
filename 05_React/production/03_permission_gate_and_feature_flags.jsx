import { useMemo } from 'react';

// Beginner: gate UI based on permissions and feature flags.
// Advanced: centralizing authorization checks avoids duplicated fragile logic.
export function PermissionGate({ user, permission, children, fallback = null }) {
  const allowed = useMemo(() => {
    if (!user || !Array.isArray(user.permissions)) return false;
    return user.permissions.includes(permission);
  }, [user, permission]);

  return allowed ? children : fallback;
}

export function FeatureFlagGate({ flags, flagName, children, fallback = null }) {
  const enabled = Boolean(flags?.[flagName]);
  return enabled ? children : fallback;
}

export default function PermissionAndFlagsDemo() {
  const user = { id: 'u1', permissions: ['orders:read', 'orders:write'] };
  const flags = { newCheckoutUI: true };

  return (
    <section>
      <h2>Permission + Feature Flag Gates</h2>
      <PermissionGate user={user} permission="orders:write" fallback={<p>No write access.</p>}>
        <button>Create Order</button>
      </PermissionGate>

      <FeatureFlagGate flags={flags} flagName="newCheckoutUI" fallback={<p>Old checkout enabled.</p>}>
        <p>New checkout experience enabled.</p>
      </FeatureFlagGate>
    </section>
  );
}
