import { useParams } from "react-router-dom";

function PublicationPage() {
    const params = useParams();
    const id = params.id;

    return (
        <p>this is a publication with {id}</p>
    )
}

export default PublicationPage;