
interface Props {
    width: number;
    height: number;
}

const IconPlus = ({ width, height } : Props) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
            <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default IconPlus