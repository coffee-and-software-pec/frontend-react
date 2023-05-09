export default interface Publication {
    id: number,
    title: string,
    tags: string[],
    userPhoto: string,
    visualizationsCount: number,
    commentsCount: number
}