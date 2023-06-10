interface UpdatePublicationDTO {
    title: string;
    subtitle: string;
    continuous_text: string;
    main_img_url: string;
    tagList: {
        title: string;
    }[]
}

export default UpdatePublicationDTO;