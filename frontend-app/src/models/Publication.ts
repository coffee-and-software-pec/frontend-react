import PublicationComment from "./PublicationComment"

export default interface Publication {
    p_id: number;
    author: {
        u_id: string;
        u_name: string;
        photoURL: string;
    };
    creation_date: string;
    visualizationsCount: number;
    heartsCount: number;
    commentsCount: number;
    tags: {title: string}[];
    title: string;
    subtitle: string;
    main_img_url: string;
    continuous_text: string;
    comments?: PublicationComment[]
}