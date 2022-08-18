export default class UserInfo {
    constructor({ userNameSelector, userDescriptionSelector, userAvatarSelector }) {
        this._userName = document.querySelector(userNameSelector);
        this._userDescription = document.querySelector(userDescriptionSelector);
        this._userAvatarImage = document.querySelector(userAvatarSelector);
    }

    getUserInfo(){
        return {
            userName: this._userName.textContent,
            userDescription: this._userDescription.textContent,
            id: this._id,
            avatar: this._avatar
        }
    }

    setUserInfo({userName, userDescription, id = null, avatar=null }){
        this._userName.textContent = userName;
        this._userDescription.textContent = userDescription;
        this._id = id;
        this.setAvatar(avatar);
    }

    setAvatar(avatar){
        this._avatar = avatar;
        this._userAvatarImage.src = avatar;
        this._userAvatarImage.alt = `Аватар Пользователя`;
    }

}