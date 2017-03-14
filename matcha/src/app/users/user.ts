export class User {
  public constructor(usr = null){
        if (usr) {
            for (let key in usr) {
                    this[key] = usr[key];
            }
        }
    }
}
