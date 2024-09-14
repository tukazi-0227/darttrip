package student.darttrip.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class DartController {
    
    @RequestMapping("/hello")
    @ResponseBody  // このアノテーションを追加して、データを返す
    public String hello(@RequestParam String name) {
        // シンプルに名前を返す
        return "Hellooooooo, " + name + "!";
    }
}

