package chapter2_yoojimin;
import java.util.Scanner;

public class no_4 {

	public static void main(String[] args) {
		System.out.print("정수 3개 입력>>");
		Scanner scanner = new Scanner(System.in);
		int num1 = scanner.nextInt();
		int num2 = scanner.nextInt();
		int num3 = scanner.nextInt();
		
		System.out.print("중간 값은 ");
		if (num1<num2 && num2<num3) { System.out.print(num2); }
		else if (num1<num3 && num3<num2) { System.out.print(num3); }
		else if (num2<num1 && num1<num3) { System.out.print(num1); }
		else if (num2<num3 && num3<num1) { System.out.print(num3); }
		else if (num3<num1 && num1<num2) { System.out.print(num1); }
		else if (num3<num2 && num2<num1) { System.out.print(num2); }
		
		scanner.close();
	}
}
