import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;

import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

    request.setCharacterEncoding("UTF-8"); // hỗ trợ tiếng Việt
    response.setContentType("text/html;charset=UTF-8");

        // Lấy dữ liệu từ form
        String username = request.getParameter("Tên tài khoản");
        String password = request.getParameter("password");

        PrintWriter out = response.getWriter();

    // Kiểm tra đơn giản: in ra hoặc lưu vào DB nếu bạn muốn
    out.println("<html><body>");
    out.println("<h2>Đăng ký thành công!</h2>");
    out.println("<p>Tài khoản: " + username + "</p>");
    out.println("</body></html>");

    // Nếu dùng CSDL thì thay bằng đoạn lưu vào DB
}
}
