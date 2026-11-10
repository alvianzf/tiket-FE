import Particles from "@components/Particles";

// Visible against any colored gradient hero (the global AnimatedBackground
// sits behind everything via position:fixed, so it can't show through an
// opaque hero section — this gives those sections their own animated motion
// instead): two soft color blobs for depth plus a white "constellation" of
// drifting, connected particles — actual motion, not just a static tint.
const HeroGlow = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <span
            className="absolute rounded-full bg-white"
            style={{ top: "-15%", left: "-8%", width: "42vmax", height: "42vmax", filter: "blur(55px)", opacity: 0.3, animation: "drift-a 22s ease-in-out infinite" }}
        />
        <span
            className="absolute rounded-full"
            style={{ bottom: "-22%", right: "-10%", width: "38vmax", height: "38vmax", filter: "blur(55px)", opacity: 0.35, background: "var(--orange)", animation: "drift-b 28s ease-in-out infinite" }}
        />
        <Particles colors={["#ffffff"]} lineColor="255,255,255" opacity={0.9} density={0.00028} maxParticles={110} radius={[1.5, 3.2]} speed={0.2} />
    </div>
);

export default HeroGlow;
