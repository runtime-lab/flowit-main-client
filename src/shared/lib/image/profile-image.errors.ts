export class ProfileImageTypeError extends Error {
    constructor() {
        super('Invalid profile image type');
        this.name = 'ProfileImageTypeError';
    }
}

export class ProfileImageSizeError extends Error {
    constructor() {
        super('Profile image is too large');
        this.name = 'ProfileImageSizeError';
    }
}
