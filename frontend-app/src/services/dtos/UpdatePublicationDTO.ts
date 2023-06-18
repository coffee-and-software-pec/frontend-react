interface UpdatePublicationDTO {
    title: string;
    subtitle: string;
    continuous_text: string;
    main_img_url: string;
    _private: boolean;
    _draft: boolean;
    tagList: {
        title: string;
    }[]
}

export default UpdatePublicationDTO;