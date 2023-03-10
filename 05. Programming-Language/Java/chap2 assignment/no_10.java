package chapter2_yoojimin;
import java.util.Scanner;
public class no_10 {

	public static void main(String[] args) {
		System.out.print("첫번째 원의 중심과 반지름 입력>>");
		Scanner scanner = new Scanner(System.in);
		double x_circle1 = scanner.nextDouble();
		double y_circle1 = scanner.nextDouble();
		double r_circle1 = scanner.nextDouble();
		
		System.out.print("두번째 원의 중심과 반지름 입력>>");
		double x_circle2 = scanner.nextDouble();
		double y_circle2 = scanner.nextDouble();
		double r_circle2 = scanner.nextDouble();
		
		double distance = Math.sqrt(((x_circle2 - x_circle1)*(x_circle2 - x_circle1)) + ((y_circle2 - y_circle1)*(y_circle2 - y_circle1)));
		
		if (distance <= (r_circle1 + r_circle2)) System.out.print("두 원은 서로 겹친다.");
		else System.out.print("두 원은 서로 겹치지 않는다.");
		
		scanner.close();
	}
}
