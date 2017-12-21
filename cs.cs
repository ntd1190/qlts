//http://www.howkteam.vn/course/lap-trinh-oop-voi-c/tong-quan-ve-lap-trinh-huong-doi-tuong-1369
//https://viblo.asia/p/bai-tap-4oop-quan-trong-trong-ngon-ngu-lap-trinh-huong-doi-tuong-Ljy5VrWk5ra
abstract class Animal
{
	protected double Weight;
	protected double Height;
	protected static int Legs;

	public void Info()
	{
		Console.WriteLine(" Weight: " + Weight + " Height: " + Height + " Legs: " + Legs);
	}
	public abstract  void Speak();
}


class Cat : Animal
{
	public Cat()
	{
		/*
			Lớp Cat kế thừa lớp Animal
			mà các thuộc tính Weight, Height, Legs có phạm vi là protected nên được phép kế thừa
			Từ đó lớp Cat có thể sử dụng mà không cần phải khai báo

		 */
		Weight = 500;
		Height = 20;
		Legs = 2;
		
		public override void Speak()
        {
            Console.WriteLine(" Cat is speaking. . .");
        }
	}
}
class Dog : Animal
{
	public  override  void speak()
	{
		console.writeline(" dog is speaking. . .");
	}
}
//Ta có 3 lớp Animal, Cat, Dog. Trong đó Cat và Dog kề thừa từ lớp Animal. Trong các lớp đều có phương thức Speak().

class MainABC
{
	public MainABC()
	{
		Cat BlackCat = new Cat();
		/* Lớp Cat kế thừa phương thức Info từ lớp Animal nên đối tượng thuộc lớp Cat có thể gọi phương thức Info() */
		BlackCat.Info();
		
		Animal cat = new Cat();
		Animal dog = new Dog();
		cat.Speak();
		dog.Speak();
	}
}