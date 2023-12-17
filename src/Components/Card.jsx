

const Card = ({title, image_url, description, subtitle, extras, secondaryAction, primaryAction, primaryActionMethod, secondaryActionMethod}) => {
    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image_url} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">
      {title}
      <br />
      
    </h2>
    <div className="text-start">
      <span className="font-bold">{extras}</span>
      <h2 className="text-blue-600 font-semibold">{subtitle}</h2>
      <p>
        {description}
      </p>
    </div>
    <div className="card-actions justify-end">
      <div>
        <button onClick={secondaryActionMethod} className="btn btn-outline">
        {secondaryAction}  
        </button>  
      </div> 
      <div>
      <button onClick={primaryActionMethod} className="btn btn-outline border-2 border-blue-600 text-blue-600">{primaryAction}</button>  
      </div>
    </div>
  </div>
</div>
        </>
    );
};

export default Card;