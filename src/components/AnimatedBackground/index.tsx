import Particles from "@components/Particles";

// Fixed, full-viewport layer behind every surface-card surface: soft
// drifting color blobs plus a genuinely animated constellation of
// particles drifting and connecting with nearby lines — the blobs alone
// read as a static tint, the particles are what makes the motion obvious.
const AnimatedBackground = () => {
    return (
        <div className="animated-bg" aria-hidden="true">
            <span className="animated-bg__blob animated-bg__blob--primary" />
            <span className="animated-bg__blob animated-bg__blob--cta" />
            <span className="animated-bg__blob animated-bg__blob--secondary" />
            <Particles colors={["#4267B2", "#0AD1FF", "#FF5A00"]} opacity={0.7} density={0.00013} maxParticles={160} radius={[1.5, 3]} />
        </div>
    );
};

export default AnimatedBackground;
