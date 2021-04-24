import { Container } from 'inversify';
import { Ninja, Katana, Shuriken, TYPES, ThrowableWeapon, Warrior, Weapon } from './inversify';

const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export { myContainer };
