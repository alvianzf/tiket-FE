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
            style={{ top: "-15%", left: "-8%", width: "40vmax", height: "40vmax", filter: "blur(70px)", opacity: 0.12, animation: "drift-a 22s ease-in-out infinite" }}
        />
        <span
            className="absolute rounded-full bg-white"
            style={{ bottom: "-20%", right: "-10%", width: "36vmax", height: "36vmax", filter: "blur(70px)", opacity: 0.1, animation: "drift-b 28s ease-in-out infinite" }}
        />
    </div>
);

export default HeroGlow;
