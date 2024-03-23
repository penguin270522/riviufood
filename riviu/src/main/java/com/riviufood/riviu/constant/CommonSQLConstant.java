package com.riviufood.riviu.constant;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class CommonSQLConstant {
    private String tableName;

    public String getSelectTable() {
        return "SELECT a.* FROM " + this.tableName + " AS a WHERE 1 = 1";
    }
}
