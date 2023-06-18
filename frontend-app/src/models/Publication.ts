import PublicationComment from "./PublicationComment"

export default interface Publication {
    p_id: string;
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
    _private: boolean;
    _draft: boolean;
    comments?: PublicationComment[]
}