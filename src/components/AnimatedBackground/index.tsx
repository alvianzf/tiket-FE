// Fixed, full-viewport layer of slow-drifting blurred gradient blobs in brand
// colors, behind every surface-card surface. Pure CSS keyframe animation (no
// framer-motion) so it costs nothing on the JS thread.
const AnimatedBackground = () => {
    return (
        <div className="animated-bg" aria-hidden="true">
            <span className="animated-bg__blob animated-bg__blob--primary" />
            <span className="animated-bg__blob animated-bg__blob--cta" />
            <span className="animated-bg__blob animated-bg__blob--secondary" />
        </div>
    );
};

export default AnimatedBackground;
