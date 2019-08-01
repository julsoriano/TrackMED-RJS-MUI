import { Base } from './Base';

// Inheritance: https://blogs.msdn.microsoft.com/premier_developer/2018/06/17/angular-how-to-simplify-components-with-typescript-inheritance/
export default class Owner extends Base {

  // selFlag: Boolean;
  itemApi = 'api/Owner';
  // title = "Owner";

  async componentDidMount() {   
    await this.getItems(this.itemApi);
  }

}