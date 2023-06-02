interface CreateProjectDTO {
    title: string;
    subtitle: string;
    continuous_text: string;
    main_img_url: string;
    author_id: string;
    tagList: {
        title: string;
    }[]
}

export default CreateProjectDTO;