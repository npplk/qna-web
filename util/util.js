export const getSortingParam = (sortType) => {
    switch (sortType) {
        case 'Votes':
            return '-score'
        case 'Views':
            return '-views'
        case 'Newest':
            return '-created'
        case 'Oldest':
            return 'created'
        default:
            break
    }
}