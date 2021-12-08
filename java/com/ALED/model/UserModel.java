package com.ALED.model;
import java.util.List;

import lombok.Data;

@Data
public class UserModel {

    private Integer id;
    private String username;
    private String password;
    private List<Integer> roles;
    private Integer countryType;
    private Integer provincialId;      /* Tỉnh */
    private Integer districtId;        /* Huyện */
    private Integer wardsId;           /* Xã */
    private Boolean isEnable;

}
