package chapter2_yoojimin;
import java.util.Scanner;
public class no_2 {

	public static void main (String[] args) {
		System.out.print("2자리수 정수 입력(10~99)>>");
		Scanner scanner = new Scanner (System.in);
		int input = scanner.nextInt();
		
		int input10, input1;
		input10 = input/10;
		input1 = input%10;
		
		if(input10==input1) {
			System.out.println("Yes! 10의 자리와 1의 자리가 같습니다.");
			}
		else { 
			System.out.println("No! 10의 자리와 1의 자리가 다릅니다.");
		}
		scanner.close();
	}
}
