interface AddProps {
  img: string;
}

export default function Add({img}: AddProps) {
    return (
        <div className="add-img">
            <img src={img} alt="" />
        </div>
    )
}