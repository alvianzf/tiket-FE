// Two slow-drifting blurred white circles, visible against any colored
// gradient hero (the global AnimatedBackground sits behind everything via
// position:fixed, so it can't show through an opaque hero section — this
// gives those sections their own animated motion instead). Reuses the
// drift-a/drift-b keyframes from global.css but with its own element/colors
// to avoid clashing with .animated-bg__blob's own sizing/opacity rules.
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
        <span
            className="absolute rounded-full bg-white"
            style={{ top: "30%", right: "10%", width: "26vmax", height: "26vmax", filter: "blur(60px)", opacity: 0.22, animation: "drift-c 17s ease-in-out infinite" }}
        />
    </div>
);

export default HeroGlow;
