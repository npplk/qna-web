const getAvatar = (user, size) => {
    return user.role === 'staff' ? '/images/npp-logo.jpg' : `https://secure.gravatar.com/avatar/${user.id}?s=${size}&d=identicon`;
}

export { getAvatar }