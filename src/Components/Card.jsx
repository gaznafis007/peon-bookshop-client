import { Link } from "react-router-dom";


const Card = ({title, object, image_url, description, subtitle, extras, secondaryAction, primaryAction, secondaryActionMethod, link}) => {
    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl">
  <figure><img src={image_url} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">
      <Link to={link}>{title}</Link>
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
        <button onClick={()=>secondaryActionMethod(object._id)} className="btn btn-outline">
        {secondaryAction}  
        </button>  
      </div> 
      <div>
      {primaryAction && <Link to={link} className="btn btn-outline border-2 border-blue-600 text-blue-600">{primaryAction}</Link>}
      </div>
    </div>
  </div>
</div>
        </>
    );
};

export default Card;