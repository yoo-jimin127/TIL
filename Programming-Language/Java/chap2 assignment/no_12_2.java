package chapter2_yoojimin;
import java.util.Scanner;
public class no_12_2 {

	public static void main(String[] args) {
		System.out.print("연산>>");
		Scanner scanner = new Scanner(System.in);
		double num1 = scanner.nextDouble();
		String operator = scanner.next();
		double num2 = scanner.nextDouble();
		
		switch (operator) {
		case "+" :
			System.out.print(num1 + operator + num2 + "의 계산 결과는 " + (num1 + num2));
			break;
			
		case "-" : 
			System.out.print(num1 + operator + num2 + "의 계산 결과는 " + (num1 - num2));
			break;
			
		case "*" : 
			System.out.print(num1 + operator + num2 + "의 계산 결과는 " + (num1 * num2));
			break;
			
		case "/" : 
			if (num2 != 0)
				System.out.print(num1 + operator + num2 + "의 계산 결과는 " + (num1 / num2));
			else System.out.print("0으로 나눌 수 없습니다.");
			break;
		}
		scanner.close();
	}
}

