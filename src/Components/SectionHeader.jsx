

const SectionHeader = ({title, subtitle}) => {
    return (
        <>
           <h2 className="text-4xl text-center text-blue-600 font-semibold">{title}</h2>
            <p className="text-center">{subtitle}</p> 
        </>
    );
};

export default SectionHeader;