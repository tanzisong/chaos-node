import { Container } from 'inversify';
import { Ninja, Katana, Shuriken, TYPES, ThrowableWeapon, Warrior, Weapon } from './inversify';

const myContainer = new Container();
myContainer.bind<Warrior>(TYPES.Warrior).to(Ninja);
myContainer.bind<Weapon>(TYPES.Weapon).to(Katana);
myContainer.bind<ThrowableWeapon>(TYPES.ThrowableWeapon).to(Shuriken);

export { myContainer };

const isNumberMetadataKey = Symbol('isNumber');

function isNumber(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  const allIsNumberParameters: number[] = Reflect.getOwnMetadata(isNumberMetadataKey, target, propertyKey) || []; // 这里的propertyKey就是constructor
  allIsNumberParameters.push(parameterIndex);
  Reflect.defineMetadata(isNumberMetadataKey, allIsNumberParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<Function>) {
  let method = descriptor.value;
  descriptor.value = function () {
    let allIsNumberParameters: number[] = Reflect.getOwnMetadata(isNumberMetadataKey, target, propertyName);
    if (allIsNumberParameters) {
      for (let parameterIndex of allIsNumberParameters) {
        if (parameterIndex >= arguments.length || typeof arguments[parameterIndex] !== 'number') {
          throw new Error('argument is not number.');
        }
      }
    }

    return method.apply(this, arguments);
  };
}
