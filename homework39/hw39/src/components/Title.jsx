export function Title({id, header, description }) {
    return (
        <div key={id} className="title">
            <h3>{header}</h3>
            <p>{description}</p>
        </div>
    )
}