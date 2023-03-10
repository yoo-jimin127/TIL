package chapter2_yoojimin;
import java.util.Scanner;
public class no_6 {

	public static void main(String[] args) {
		System.out.print("1~99 사이의 정수를 입력하시오>>");
		Scanner scanner = new Scanner(System.in);
		int input = scanner.nextInt();
		
		int input10, input1;
		input10 = input/10;
		input1 = input%10;
		
		if (input10 == 0) {
			if (input1==3 || input1==6 || input1==9) { System.out.print("박수짝"); }
			else System.out.print("패스");
		}
		
		else {
			if (input10==3 || input10==6 || input10==9) {
				if (input1==3 || input1==6 || input1==9) { System.out.print("박수짝짝"); }
				else System.out.print("박수짝");
			}
			else if (input10!=3 && input10!=6 && input10!=9) { 
				if (input1==3 || input1==6 || input1==9) { System.out.print("박수짝"); }
				else System.out.print("패스");
			}
		}
			scanner.close();
	}
}
